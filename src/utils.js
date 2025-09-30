function formatResponse(listing) {
  const children = listing.children || [];
  const data = children.map((el) => ({
    author: el.data.author || "unknown",
    title: el.data.title || "",
    marked_as_nsfw: !!el.data.over_18,
    post_hint: el.data.post_hint || "unknown",
    url: el.data.url_overridden_by_dest || el.data.url,
  }));

  return {
    error: false,
    code: 200,
    type: "Success",
    data,
    pagination: {
      after: listing.after || null,
      before: listing.before || null,
    },
  };
}

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = {
  formatResponse,
  asyncHandler,
};
