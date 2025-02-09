"use server";

import cloudinary, { uploadToCloudinary } from "../config/cloudinary";
import { handleErrorResponse } from "../helper/error-utils";

export const uploadImageAction = async (formData: FormData) => {
  try {
    const imageFile = formData.get("image");

    const uploadResult = await uploadToCloudinary(imageFile as Blob, "tiktok");

    console.log(uploadResult);
    return { message: "Upload success", success: true };
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error).message },
      success: false,
    };
  }
};
