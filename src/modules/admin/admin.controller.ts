import { RequestHandler } from 'express';
import { AdminServices } from './admin.service';

const getAllAdmins: RequestHandler = async (req, res, next) => {
  try {
    const result = await AdminServices.getAllAdminsFromDB(req.query);
    res.status(200).json({
      success: true,
      message: 'Admins are retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};



const getSingleAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await AdminServices.getSingleAdminFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Admin is retrieved successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};




const updateAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { admin } = req.body;
    const result = await AdminServices.updateAdminIntoDB(id, admin);
    res.status(200).json({
      success: true,
      message: 'Admin is updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};



const deleteAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await AdminServices.deleteAdminFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Admin is deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
