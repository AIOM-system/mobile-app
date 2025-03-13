export const RECEIPT_IMPORT_STATUS = {
  DRAFT: "draft",
  PROCESSING: "processing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  SHORT_RECEIVED: "short_received",
  OVER_RECEIVED: "over_received",
} as const;

export const RECEIPT_RETURN_STATUS = {
  DRAFT: "draft",
  PROCESSING: "processing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export const RECEIPT_CHECK_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  BALANCING_REQUIRED: "balancing_required",
  BALANCED: "balanced",
} as const;

type ReceiptImportStatus =
  (typeof RECEIPT_IMPORT_STATUS)[keyof typeof RECEIPT_IMPORT_STATUS];

type ReceiptReturnStatus =
  (typeof RECEIPT_RETURN_STATUS)[keyof typeof RECEIPT_RETURN_STATUS];

type ReceiptCheckStatus =
  (typeof RECEIPT_CHECK_STATUS)[keyof typeof RECEIPT_CHECK_STATUS];

export type ReceiptStatus =
  | ReceiptImportStatus
  | ReceiptReturnStatus
  | ReceiptCheckStatus;

export const getStatusColor = (status: ReceiptStatus): string => {
  switch (status) {
    // Import & Return Status Colors
    case RECEIPT_IMPORT_STATUS.DRAFT:
    case RECEIPT_RETURN_STATUS.DRAFT:
      return "medium";

    case RECEIPT_IMPORT_STATUS.PROCESSING:
    case RECEIPT_RETURN_STATUS.PROCESSING:
    case RECEIPT_CHECK_STATUS.PROCESSING:
      return "warning";

    case RECEIPT_IMPORT_STATUS.COMPLETED:
    case RECEIPT_RETURN_STATUS.COMPLETED:
    case RECEIPT_CHECK_STATUS.BALANCED:
      return "success";

    case RECEIPT_IMPORT_STATUS.CANCELLED:
    case RECEIPT_RETURN_STATUS.CANCELLED:
      return "danger";

    case RECEIPT_IMPORT_STATUS.SHORT_RECEIVED:
    case RECEIPT_IMPORT_STATUS.OVER_RECEIVED:
      return "dark";

    // Check Status Colors
    case RECEIPT_CHECK_STATUS.PENDING:
      return "medium";

    case RECEIPT_CHECK_STATUS.BALANCING_REQUIRED:
      return "warning";

    default:
      return "medium";
  }
};

export const getStatusLabel = (status: ReceiptStatus): string => {
  switch (status) {
    // Import & Return Status Labels
    case RECEIPT_IMPORT_STATUS.DRAFT:
    case RECEIPT_RETURN_STATUS.DRAFT:
      return "Nháp";

    case RECEIPT_IMPORT_STATUS.PROCESSING:
    case RECEIPT_RETURN_STATUS.PROCESSING:
    case RECEIPT_CHECK_STATUS.PROCESSING:
      return "Đang xử lý";

    case RECEIPT_IMPORT_STATUS.COMPLETED:
    case RECEIPT_RETURN_STATUS.COMPLETED:
      return "Hoàn thành";

    case RECEIPT_IMPORT_STATUS.CANCELLED:
    case RECEIPT_RETURN_STATUS.CANCELLED:
      return "Đã hủy";

    case RECEIPT_IMPORT_STATUS.SHORT_RECEIVED:
      return "Giao thiếu";

    case RECEIPT_IMPORT_STATUS.OVER_RECEIVED:
      return "Giao dư";

    case RECEIPT_CHECK_STATUS.PENDING:
      return "Chờ xử lý";

    case RECEIPT_CHECK_STATUS.BALANCING_REQUIRED:
      return "Cần cân bằng";

    case RECEIPT_CHECK_STATUS.BALANCED:
      return "Đã cân bằng";

    default:
      return "Không xác định";
  }
};
