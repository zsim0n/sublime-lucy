import nameGenerator from "@stackbit/artisanal-names";
exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: nameGenerator.generate()
  });
};