/* Use the same meaning-focused summaries as the recommended reading card. */
import {CHAPTER_READINGS} from './chapter-recommendations.js?v=20261013-story-adapted-meanings-1';
export const STORY_READING_COPY=Object.fromEntries(CHAPTER_READINGS.map(c=>[c.id,{es:c.fullSummaryES,en:c.fullSummaryEN}]));
