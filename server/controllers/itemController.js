const asyncHandler = require("express-async-handler");
const Item = require("../models/Items");
const fs = require("fs");

const getUserItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ userId: req.user.id });
  if (items) {
    res.status(200).json(items);
  }
});

const addItem = asyncHandler(async (req, res) => {
  const { thumbnailImage, text, file } = req.body;
  const item = await Item.create({
    userId: req.user.id,
    thumbnailImage: {
      data: thumbnailImage[0],
    },
    text,
    file: {
      data: file[0],
    },
  });
  if (!item) {
    res.status(400);
    throw new Error("Invalid item data");
  }
  res.status(201).json(item);
});

const updateItem = asyncHandler(async (req, res) => {
  const { thumbnailImage, text, file } = req.body;
  const item = await Item.findByIdAndUpdate(
    req.params.id,
    {
      thumbnailImage: {
        data: thumbnailImage[0],
      },
      text,
      file: {
        data: file[0],
      },
    },
    {
      new: true,
    }
  );
  if (!item) {
    res.status(400);
    throw new Error("Invalid item data");
  }
  res.status(201).json(item);
});

const deleteItem = asyncHandler(async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.log(err);
  }
});

module.exports = { getUserItems, addItem, updateItem, deleteItem };
