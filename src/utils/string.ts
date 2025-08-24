/**
 * Converts various YouTube URL formats to their embed URL equivalent.
 * 
 * This function supports multiple YouTube URL formats and extracts the video ID
 * to generate a standardized embed URL that can be used in iframes or other
 * embed contexts.
 * 
 * @param url - The YouTube URL to convert. Supports the following formats:
 *   - Standard watch URLs: `https://www.youtube.com/watch?v=VIDEO_ID`
 *   - Short URLs: `https://youtu.be/VIDEO_ID`
 *   - Embed URLs: `https://www.youtube.com/embed/VIDEO_ID`
 *   - Legacy v URLs: `https://www.youtube.com/v/VIDEO_ID`
 * 
 * @returns A standardized YouTube embed URL in the format `https://www.youtube.com/embed/VIDEO_ID`.
 *          If the input URL doesn't match any supported pattern, returns the original URL unchanged.
 *
 * 
 * @since 1.0.0
 */
export function getYouTubeEmbedUrl(url: string): string {
  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  
  // If no pattern matches, return the original URL
  return url;
}