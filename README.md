<script type="text/javascript">
  window.DocsBotAI = window.DocsBotAI || {};
  DocsBotAI.init = function(e) {
      return new Promise((t, r) => {
          var n = document.createElement("script");
          n.type = "text/javascript", n.async = true, n.src = "https://widget.docsbot.ai/chat.js";
          let o = document.getElementsByTagName("script")[0];
          o.parentNode.insertBefore(n, o), n.addEventListener("load", () => {
              let n;
              Promise.all([
                  new Promise((t, r) => {
                      window.DocsBotAI.mount(Object.assign({}, e)).then(t).catch(r)
                  }),
                  (n = function e(t) {
                      return new Promise(e => {
                          if (document.querySelector(t)) return e(document.querySelector(t));
                          let r = new MutationObserver(n => {
                              if (document.querySelector(t)) return e(document.querySelector(t)), r.disconnect()
                          });
                          r.observe(document.body, { childList: true, subtree: true })
                      })
                  })("#docsbotai-root"),
              ]).then(() => t()).catch(r)
          }), n.addEventListener("error", e => { r(e.message) })
      })
  };
</script>

<script type="text/javascript">
    DocsBotAI.init({id: "2FUVOIcO7EeX5ulmzipY/paODFAHSK3dDVG0VTxRy"});
</script>
