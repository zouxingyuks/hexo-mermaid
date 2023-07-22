const assign = require('deep-assign');

hexo.config.mermaid = assign({
  version: 'latest',
  enable: true,
},
  hexo.config.mermaid
);

if (hexo.config.mermaid.enable)
{
  if ( hexo.config.mermaid.enable)
  hexo.extend.injector.register('head_end', () => {
    const mermaidScript = `<script type="module" src="https://cdn.jsdelivr.net/npm/mermaid@${hexo.config.mermaid.version}/dist/mermaid.esm.min.mjs">
    mermaid.initialize(
      startOnLoad: true,
    );
    </script>`;
  
    return mermaidScript;
  });
  hexo.extend.filter.register('before_post_render', require('./lib/render'), 9);
  
}
