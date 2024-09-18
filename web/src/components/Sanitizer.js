// const defaultOptions = {
//   allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
//   allowedAttributes: {
//     'a': [ 'href' ]
//   },
//   allowedIframeHostnames: ['www.youtube.com']
// };

// const sanitize = (dirty, options) => ({
//   __html: sanitizeHtml(
//     dirty, 
//     options: { ...defaultOptions, ...options }
//   )
// });

// const SanitizeHTML = ({ html, options }) => (
//   <div dangerouslySetInnerHTML={sanitize(html, options)} />
// );