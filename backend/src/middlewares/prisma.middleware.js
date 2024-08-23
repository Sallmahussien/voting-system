const prismaMiddleware = (prisma) => {
  prisma.$use(async (params, next) => {
    const now = new Date();

    if (params.model === 'Topic') {
      if (params.action === 'findUnique' || params.action === 'findMany') {
        const result = await next(params);

        if (result) {
          if (!Array.isArray(result)) {
            const { startDate, endDate, status } = result;

            if (status !== 'CANCELLED') {
              const newStatus = startDate <= now && endDate >= now ? 'ACTIVE' : 'INACTIVE';
              
              if (result.status !== newStatus) {
                await prisma.topic.update({
                  where: { id: result.id },
                  data: { status: newStatus }
                });
                result.status = newStatus;
              }
            }
          } 
          else {
            await Promise.all(result.map(async (topic) => {
              const { startDate, endDate, status } = topic;

              if (status !== 'CANCELLED') {
                const newStatus = startDate <= now && endDate >= now ? 'ACTIVE' : 'INACTIVE';
                
                if (topic.status !== newStatus) {
                  await prisma.topic.update({
                    where: { id: topic.id },
                    data: { status: newStatus }
                  });
                  topic.status = newStatus;
                }
              }
            }));
          }
        }

        return result;
      }

      if (params.action === 'create' || params.action === 'update') {
        if (params.args.data) {
          let { startDate, endDate, status } = params.args.data;

          if (params.action === 'update' && !status) {
            const existingTopic = await prisma.topic.findUnique({
              where: { id: params.args.where.id },
              select: { status: true, startDate: true, endDate: true }
            });

            status = existingTopic.status;
            startDate = startDate || existingTopic.startDate;
            endDate = endDate || existingTopic.endDate;
          }

          if (status !== 'CANCELLED') {
            const newStatus = startDate <= now && endDate >= now ? 'ACTIVE' : 'INACTIVE';
            params.args.data.status = newStatus;
          }
        }
      }
    }

    return next(params);
  });
};

export default prismaMiddleware;
