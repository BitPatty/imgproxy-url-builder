// Reference: https://github.com/imgproxy/imgproxy/blob/b243a08254b9ca7da2c628429cd870c111ece5c9/docs/generating_the_url.md#jpeg-options-idjpeg-options

import { stringifyOptions } from '../utils';

type JpegOptions = {
  /**
   * If true, enables progressive JPEG compression
   */
  progressive?: boolean;

  /**
   * If true, chrominance sub-sampling is disabled
   */
  noSubsample?: boolean;

  /**
   * If true, enables trellis quantization for each
   * 8x8 block
   */
  trellisQuant?: boolean;

  /**
   * If true, enables overshooting of samples with
   * extreme values
   */
  overshootDeringing?: boolean;

  /**
   * If true, split the spectrum of DCT coefficients
   * into separate scans
   */
  optimizeScans?: boolean;

  /**
   * Quantization table to use
   *
   *     0: Table from JPEG Annex K (default);
   *     1: Flat table;
   *     2: Table tuned for MSSIM on Kodak image set;
   *     3: Table from ImageMagick by N. Robidoux;
   *     4: Table tuned for PSNR-HVS-M on Kodak image set;
   *     5: Table from Relevance of Human Vision to JPEG-DCT Compression (1992);
   *     6: Table from DCTune Perceptual Optimization of Compressed Dental X-Rays (1997);
   *     7: Table from A Visual Detection Model for DCT Coefficient Quantization (1993);
   *     8: Table from An Improved Detection Model for DCT Coefficient Quantization (1993).
   */
  quantizationTable?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

/**
 * Allows redefining JPEG saving options
 *
 * @param options The jpeg options
 *
 * @returns The jpeg option params
 */
const jpegOptions = (options: JpegOptions): string =>
  stringifyOptions('jpgo', [
    options.progressive,
    options.noSubsample,
    options.trellisQuant,
    options.overshootDeringing,
    options.optimizeScans,
    options.quantizationTable,
  ]);

export default jpegOptions;
export { JpegOptions };
