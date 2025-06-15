import { EPostSectionType } from '@Shared/enum/EPostSectionType';

export const PAGE_TITLE = {
  BLOG: 'Blog | hnnguyen.dev'
};

export const POST_SECTION_TYPES = [
  { label: 'Text', value: EPostSectionType.TEXT },
  { label: 'Image', value: EPostSectionType.IMAGE },
  { label: 'Video', value: EPostSectionType.VIDEO },
  { label: 'Audio', value: EPostSectionType.AUDIO },
  { label: 'File', value: EPostSectionType.FILE }
];

export const POST_STATUSES = [
  { label: 'Draft', value: 'DRAFT' },
  { label: 'Published', value: 'PUBLISHED' },
  { label: 'Archived', value: 'ARCHIVED' }
];

export const DATE_FORMAT = {
  YYYY_MM_DD: 'YYYY-MM-DD'
};

export const PAGINATION_DEFAULT = {
  PAGE: 0,
  ROWS: 10,
  ROWS_12: 12,
  TOTAL_RECORDS: 0,
  ROWS_PER_PAGE_OPTIONS: [5, 10, 15, 25, 50, 100]
};

export const FILE_SIZE = {
  _1MB: '1048576',
  _5MB: '5242880',
  _10MB: '10485760',
  _15MB: '15728640',
  _25MB: '26214400'
};

export const ACCEPT_FILE = {
  IMAGE: '.jpg,.jpeg,.png,.heif,.heic,.gif,.svg,.bmp,.webp,.tif,.tiff,.ico'
};

export const REGEX = {
  PASSWORD: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/,
  USERNAME: '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'
};
