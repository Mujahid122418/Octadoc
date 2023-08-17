const answer = require("../models/answer");
const Answer = require("../models/answer");
const TemplateQuestions = require("../models/templateQuestions");

exports.addQuestion = async (req, res) => {
  const payload = req.body;

  await TemplateQuestions(payload)
    .save()
    .then((item) => {
      res.json({ success: true, data: item });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Route to get paginated data
exports.getQuestion = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the requested page or default to 1
  const pageSize = parseInt(req.query.pageSize) || 10; // Get the page size or default to 10

  try {
    const totalDocuments = await TemplateQuestions.countDocuments(); // Get the total number of documents

    const totalPages = Math.ceil(totalDocuments / pageSize); // Calculate the total number of pages

    const skip = (page - 1) * pageSize; // Calculate the number of documents to skip

    // Query and retrieve paginated data
    const data = await TemplateQuestions.find()
      // .populate("template_id")
      .skip(skip)
      .limit(pageSize);

    let ans = await Answer.findOne({ question_id: { $in: data } });
    let nn = data.forEach((item) => {});
    console.log("ans", ans);
    // console.log("ans", ans);
    // const appendObjTo = (thatArray, newObj) => {
    //   const frozenObj = Object.freeze(newObj);
    //   return Object.freeze(thatArray.concat(frozenObj));
    // };

    const updatedData = data.map((item) => ({
      item,
      ans,
    }));

    // console.log(updatedData);
    // Create a mapping of question IDs to their respective items
    const questionIdToItemMap = {};

    updatedData.forEach((updatedItem) => {
      const { item, ans } = updatedItem;

      if (!questionIdToItemMap[item._id]) {
        questionIdToItemMap[item._id] = { ...item, answers: [] };
      }

      questionIdToItemMap[item._id].answers.push(ans);
    });

    // Convert the mapped items back into an array
    const itemsWithAnswers = Object.values(questionIdToItemMap);

    // console.log("itemsWithAnswers", itemsWithAnswers);
    res.json({
      data,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.deleteQuestion = async (req, res) => {
  TemplateQuestions.findByIdAndDelete(req.params?.id)
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

exports.updateQuestion = async (req, res) => {
  TemplateQuestions.findByIdAndUpdate(req.params?.id, req.body, {
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
