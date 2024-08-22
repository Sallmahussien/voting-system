const prismaMiddleware = (prisma) => {
  prisma.$use(async (params, next) => {
    if (params.model === 'Topic' && (params.action === 'findUnique' || params.action === 'findMany')) {
      const result = await next(params);

      if (result) {
        // Single topic
        if (!Array.isArray(result)) {
          const { startDate, endDate, status } = result;
          const now = new Date();
          if (status !== 'CANCELLED') {
            result.status = startDate <= now && endDate >= now ? 'ACTIVE' : 'INACTIVE';
          }
        } 
        // Multiple topics
        else {
          result.forEach(topic => {
            const { startDate, endDate, status } = topic;
            const now = new Date();
            if (status !== 'CANCELLED') {
              topic.status = startDate <= now && endDate >= now ? 'ACTIVE' : 'INACTIVE';
            }
          });
        }
      }

      return result;
    }

    if (params.model === 'Topic' && (params.action === 'create' || params.action === 'update')) {
      if (params.args.data) {
        const now = new Date();
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
          params.args.data.status = startDate <= now && endDate >= now ? 'ACTIVE' : 'INACTIVE';
        }
      }
    }

    return next(params);
  });
};

export default prismaMiddleware;
