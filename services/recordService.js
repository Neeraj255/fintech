const mongoose = require('mongoose');
const Record = require('../models/Record');

/**
 * @desc    Get metrics for the dashboard summary
 */
exports.getSummary = async () => {
  const stats = await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $facet: {
        totals: [
          {
            $group: {
              _id: null,
              totalIncome: {
                $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
              },
              totalExpenses: {
                $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
              },
            },
          },
        ],
        categoryBreakdown: [
          {
            $group: {
              _id: "$category",
              total: { $sum: "$amount" },
              count: { $sum: 1 },
            },
          },
        ],
      },
    },
  ]);

  const results = stats[0].totals[0] || { totalIncome: 0, totalExpenses: 0 };
  return {
    totalIncome: results.totalIncome,
    totalExpenses: results.totalExpenses,
    netBalance: results.totalIncome - results.totalExpenses,
    categories: stats[0].categoryBreakdown,
  };
};

/**
 * @desc    CRUD Operations for records
 */
exports.createRecord = async (recordData, userId) => {
  return await Record.create({ ...recordData, user: userId });
};

exports.getRecords = async (query) => {
  const { page = 1, limit = 10, category, type, startDate, endDate, q } = query;
  
  const mongoQuery = { isDeleted: false };
  
  if (category) mongoQuery.category = category;
  if (type) mongoQuery.type = type;
  if (q) mongoQuery.$text = { $search: q };
  
  // Date filtering
  if (startDate || endDate) {
    mongoQuery.date = {};
    if (startDate) mongoQuery.date.$gte = new Date(startDate);
    if (endDate) mongoQuery.date.$lte = new Date(endDate);
  }

  const records = await Record.find(mongoQuery)
    .populate("user", "username role")
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .sort({ date: -1 });

  const total = await Record.countDocuments(mongoQuery);

  return { records, total, page: parseInt(page), pages: Math.ceil(total / limit) };
};

exports.getRecordById = async (id) => {
  const record = await Record.findOne({ _id: id, isDeleted: false });
  if (!record) throw new Error('Record not found');
  return record;
};

exports.updateRecord = async (id, updateData) => {
  return await Record.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

exports.deleteRecord = async (id) => {
  return await Record.findByIdAndUpdate(id, { isDeleted: true });
};
