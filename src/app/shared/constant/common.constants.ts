import { EPostSectionType } from '@Shared/enum/EPostSectionType';

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
