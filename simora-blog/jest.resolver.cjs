const path = require('path');

const resolver = {
  sync: {
    resolveSync: (request, options) => {
      if (request.startsWith('@/content/')) {
        const contentPath = request.replace('@/content/', '');
        return path.resolve(__dirname, 'content', contentPath);
      }
      return options.defaultResolver(request, options);
    }
  },
  async: {
    resolve: async (request, options) => {
      if (request.startsWith('@/content/')) {
        const contentPath = request.replace('@/content/', '');
        return path.resolve(__dirname, 'content', contentPath);
      }
      return options.defaultResolver(request, options);
    }
  }
};

module.exports = resolver;
