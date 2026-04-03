const recordService = require('../services/recordService');

exports.getSummary = async (req, res, next) => {
  try {
    const summary = await recordService.getSummary();
    res.status(200).json({ success: true, data: summary });
  } catch (err) {
    next(err);
  }
};

exports.getRecords = async (req, res, next) => {
  try {
    const data = await recordService.getRecords(req.query);
    res.status(200).json({
      success: true,
      count: data.records.length,
      pagination: {
        total: data.total,
        page: data.page,
        pages: data.pages
      },
      data: data.records
    });
  } catch (err) {
    next(err);
  }
};

exports.getRecord = async (req, res, next) => {
  try {
    const record = await recordService.getRecordById(req.params.id);
    res.status(200).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};

exports.createRecord = async (req, res, next) => {
  try {
    const record = await recordService.createRecord(req.body, req.user.id);
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};

exports.updateRecord = async (req, res, next) => {
  try {
    const record = await recordService.updateRecord(req.params.id, req.body);
    res.status(200).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};

exports.deleteRecord = async (req, res, next) => {
  try {
    await recordService.deleteRecord(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
