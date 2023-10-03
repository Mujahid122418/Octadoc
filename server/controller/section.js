const Section = require("../models/section");
const Question = require("../models/templateQuestions");
exports.addSection = async (req, res) => {
  const payload = req.body;

  await Section(payload)
    .save()
    .then((item) => {
      res.json({ success: true, data: item });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Route to get paginated data
exports.getSection = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the requested page or default to 1
  const pageSize = parseInt(req.query.pageSize) || 10; // Get the page size or default to 10

  try {
    const totalDocuments = await Section.countDocuments(); // Get the total number of documents

    const totalPages = Math.ceil(totalDocuments / pageSize); // Calculate the total number of pages

    const skip = (page - 1) * pageSize; // Calculate the number of documents to skip

    // Query and retrieve paginated data
    const data = await Section.find({
      tempplate_id: req.query.template_id,
    });
    let newData = data.sort((a, b) => a.order - b.order);

    // .skip(skip).limit(pageSize);

    res.json({
      data,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSection = async (req, res) => {
  await Question.deleteMany({ section_id: req.params?.id });
  await Section.findByIdAndDelete(req.params?.id)
    .then((deletedPost) => {
      if (deletedPost) {
        res.status(200).send({
          success: true,
          message: "Delete successfully",
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: error.message,
      });
    });
};

exports.updateSection = async (req, res) => {
  await Section.findByIdAndUpdate(req.params?.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedPost) => {
      if (updatedPost) {
        res.status(200).send({
          success: true,
          message: "Updated successfully",
          data: updatedPost,
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: error.message,
      });
    });
};
exports.getSectionTemplate = async (req, res) => {
  try {
    console.log("get ", req.body);
  } catch (error) {}
};

exports.updateManySection = async (req, res) => {
  try {
    req.body.map(async (item) => {
      const filter = { _id: item._id }; // Use the document's _id as the filter
      const update = { $set: { order: item.order } };

      try {
        await Section.findByIdAndUpdate(filter, item, {
          new: true,
          runValidators: true,
        }).then((updatedPost) => {
          if (updatedPost) {
            res.status(200).send({
              success: true,
              message: "Updated successfully",
              // data: updatedPost,
            });
          } else {
            res.status(400).send({
              success: false,
              message: "Not found",
            });
          }
        });
      } catch (error) {
        console.error(`Error updating document with _id ${item._id}:`, error);
      }
    });
  } catch (error) {}
};
