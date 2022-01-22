/*
 +-----------------------------------------------------------+
 | Module Name: Response message module	                      |
 | Module Purpose: Manage the Response message in the response|
 +------------------------------------------------------------+
*/
"use strict";

module.exports = {
  INTERNAL_SERVER_ERROR: "Internal server error.",
  SUCCESSFULLY_DONE: "Get successfully.",
  BAD_REQUEST: "Invalid Request",
  INVALID_ARGS: "Invalid arguments",
  INVALID_DATE_FORMAT: "Date format must be YYYY-MM-DD for",
  INVALID_RANGE: "Invalid range for",
  CREATE_SUCCESS: "created successfully",
  DELETE_SUCCESS: "deleted successfully",
  UPDATE_SUCCESS: "updated successfully",
  PUBLISH_SUCCESS: "published successfully",
  COPY_SUCCESS: "copied successfully",
  FETCH_SUCCESS: "fetched successfully.",
  NO_VALID_RECORD_FOUND: "No valid record found",
  NO_VALID_RECORD_FOR_NAME: "No valid record found for provided name",
  NO_VALID_RECORD_FOR_CRITERIA:
    "No valid record found for provided search criteria",
  UNABLE_TO_MARK_INACTIVE: "is in draft mode so unable to mark as inactive.",
  UNABLE_TO_MARK_DRAFT: "is in unpublished mode so unable to mark as draft.",
  UNABLE_TO_MARK_UNPUBLISH: "is in draft mode so unable to unpublish.",
  INVALID_VALUE: "Invalid value",
  NO_PERMISSION: "User does not have the permission to",
  PROVIDE_VALID: "Please provide valid",
  INVALID_FILE_TYPE: "Invalid file type",
  REFRESH_SCHEDULED_SUCCESS: "Statistics update scheduled successfully.",
  MOVED_SUCCESS: "moved successfully",
  NO_RECORD_FOUND: "No record found",
  REFRESHED_SUCCESS: "refreshed successfully",
  PERMALINK_REQUIRED: "permalink is required",
};
