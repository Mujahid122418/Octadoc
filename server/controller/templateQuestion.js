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
    const data1 = await TemplateQuestions.find({})
      .lean()
      .skip(skip)
      .limit(pageSize);

    let ans = await Answer.find({ question_id: { $in: data1 } }).lean();

    const data =
      (await data1?.length) > 0 &&
      data1.map((objA) => {
        const matchingObjB = ans?.find(
          (objB) => objB?.question_id.toString() === objA._id?.toString()
        );

        if (
          matchingObjB &&
          Object.keys(matchingObjB).length > 0 &&
          matchingObjB !== null &&
          matchingObjB !== undefined
        ) {
          let {
            follow_up_question_group_id,
            text,
            question_id,
            template_id,
            _id,
            answer,
            question,
            question_type,
          } = matchingObjB;

          let answerD = {
            follow_up_question_group_id,
            text,
            question_id,
            template_id,
            ans_id: _id,

            answer,
            question,
            question_type,
          };

          return { ...objA, answerD };
        } else {
          return { ...objA };
        }
      });

    res.json({
      data: data === false ? [] : data,
      currentPage: page,
      totalPages,
      count: totalDocuments,
    });

    let data3 = await TemplateQuestions.aggregate([
      {
        $lookup: {
          from: "templatequestion",
          localField: "question_id",
          foreignField: "_id",
          as: "answer",
        },
      },
      {
        $match: {
          matchingDocuments: { $ne: [] }, // Match only documents where there is a match in collectionB
        },
      },
      // {
      //   $project: {
      //     _id: 1,
      //     text: 1,
      //     output: 1,
      //     order: 1,
      //     "question.question_type": 1,
      //     "question.template_id": 1,
      //     "question.question": 1,
      //     "question.createdAt": 1,
      //     "question.updatedAt": 1,
      //   },
      // },
    ]);
    console.log("data", data3);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.deleteQuestion = async (req, res) => {
  await Answer.deleteMany({ question_id: req.params?.id });
  await TemplateQuestions.findByIdAndDelete(req.params?.id)
    .then((deletedPost) => {
      if (deletedPost) {
        res.status(200).send({
          success: true,
          message: "Delete successfully",
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Not found ",
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

exports.singleQuestion = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the requested page or default to 1
  const pageSize = parseInt(req.query.pageSize) || 10; // Get the page size or default to 10

  try {
    const totalDocuments = await TemplateQuestions.countDocuments(); // Get the total number of documents

    const totalPages = Math.ceil(totalDocuments / pageSize); // Calculate the total number of pages

    const skip = (page - 1) * pageSize; // Calculate the number of documents to skip

    // Query and retrieve paginated data

    // Find data based on the query
    // { _id: req?.params.id }

    const data1 = await TemplateQuestions.findOne({ _id: req.params.id })
      .lean()
      .skip(skip)
      .limit(pageSize);

    // let ans = await Answer.findOne({ _id: req.params.id }).lean();

    // const data = await data1.map((objA) => {
    //   const matchingObjB = ans.find(
    //     (objB) => objB?.question_id.toString() === objA._id.toString()
    //   );
    //   if (
    //     matchingObjB &&
    //     Object.keys(matchingObjB).length > 0 &&
    //     matchingObjB !== null &&
    //     matchingObjB !== undefined
    //   ) {
    //     let {
    //       follow_up_question_group_id,
    //       text,
    //       question_id,
    //       template_id,
    //       _id,
    //     } = matchingObjB;

    //     let send = {
    //       follow_up_question_group_id,
    //       text,
    //       question_id,
    //       template_id,
    //       ans_id: _id,
    //     };

    //     return { ...objA, ...send };
    //   } else {
    //     return { ...objA };
    //   }
    // });
    res.json({
      data1,
      currentPage: page,
      totalPages,
    });
  } catch (error) {}
};
