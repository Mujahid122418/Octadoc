const Answer = require("../models/answer");
const TemplateQuestions = require("../models/templateQuestions");
const FollowUp = require("../models/followup");
const { v4: uuidv4 } = require("uuid");
const { default: mongoose } = require("mongoose");
exports.addQuestion = async (req, res) => {
  const payload = req.body;
  try {
    const {
      question,
      answer,
      parentId,
      template_id,
      section_id,
      questionType,
    } = req.body;
    let savedQuestion;
    if (parentId) {
      const parentQuestion = await TemplateQuestions.findById(parentId);
      if (parentQuestion) {
        const newId = uuidv4();
        const previousFollowBy = parentQuestion.followUp.length
          ? parentQuestion.followUp[parentQuestion.followUp.length - 1]._id
          : parentQuestion._id;

        const followUp = {
          question,
          answer,
          newId,
          template_id,
          section_id,
          questionType,
          followBy: previousFollowBy,
        };
        parentQuestion.followUp.push(followUp);
        await parentQuestion.save();
        savedQuestion = parentQuestion;
      } else {
        const newQuestion = new TemplateQuestions({
          question,
          answer,
          template_id,
          section_id,
          questionType,
        });
        savedQuestion = await newQuestion.save();
      }
    } else {
      const newQuestion = new TemplateQuestions({
        question,
        answer,
        template_id,
        section_id,
        questionType,
      });
      savedQuestion = await newQuestion.save();
    }
    res.status(201).json({
      message: "Question and Answer created successfully",
      question: savedQuestion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Route to Edit the Questions
exports.EditQuestions = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, followUpId, questionType } = req.body;
    const existingQuestion = await TemplateQuestions.findById(id);
    if (!existingQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    if (followUpId) {
      const followUpQuestion = existingQuestion?.followUp?.find(
        (followUp) => followUp?._id?.toString() === followUpId
      );
      if (!followUpQuestion) {
        return res.status(404).json({ error: "Follow-up question not found" });
      }
      followUpQuestion.question = question;
      followUpQuestion.answer = answer;
      followUpQuestion.questionType = questionType;

      const updatedQuestion = await existingQuestion.save();
      return res.status(200).json({
        message: "Follow-up Question and Answer updated successfully",
        question: updatedQuestion,
      });
    }
    existingQuestion.question = question;
    existingQuestion.answer = answer;
    existingQuestion.questionType = questionType;
    const updatedQuestion = await existingQuestion.save();
    res.status(200).json({
      message: "Question and Answer updated successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Delet Questions
exports.DeleteQuestions = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { followUpId } = req.body;
    console.log("follow up", followUpId);
    const deletedQuestion = await TemplateQuestions.findById(questionId);
    console.log("deletedQuestion", deletedQuestion);
    // if (!deletedQuestion) {
    //   return res.status(404).json({ error: "Question not found" });
    // }
    // if (followUpId && questionId) {
    //   const updatedQuestion = await TemplateQuestions.findByIdAndUpdate(
    //     questionId,
    //     {
    //       $pull: { followUp: { _id: mongoose.Types.ObjectId(followUpId) } },
    //     },
    //     { new: true }
    //   );

    //   if (!updatedQuestion) {
    //     return res.status(404).json({ error: "Question not found" });
    //   }

    //   return res.status(200).json({
    //     message: "Follow-up Question and Answer deleted successfully",
    //   });
    // }
    // await deletedQuestion.remove();

    return res.status(200).json({
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
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
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.deleteQuestion = async (req, res) => {
  await FollowUp.deleteMany({ question_id: req.params?.id });
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

    const data1 = await TemplateQuestions.findOne({ _id: req.params.id })
      .lean()
      .skip(skip)
      .limit(pageSize);

    // let ans = await Answer.find({ question_id: { $in: data1 } }).lean();

    // const matchingObjB = ans?.find(
    //   (objB) => objB?.question_id.toString() == data1?._id?.toString()
    // );

    // let {
    //   follow_up_question_group_id,
    //   text,
    //   question_id,
    //   template_id,
    //   _id,
    //   answer,
    //   question,
    //   question_type,
    // } = matchingObjB;
    // let answerD = {
    //   follow_up_question_group_id,
    //   text,
    //   question_id,
    //   template_id,
    //   ans_id: _id,

    //   answer,
    //   question,
    //   question_type,
    // };
    // let objA = {
    //   _id: data1?._id,
    //   template_id: data1?.template_id,
    //   question: data1?.question,
    //   question_type: data1?.question_type,
    // };
    // let v = { ...objA, answerD };

    res.json({
      data: data1,
      currentPage: page,
      totalPages,
      count: totalDocuments,
    });
  } catch (error) {
    console.log("get single catch error", error);
  }
};

exports.Add_Update_Answer = async () => {};
