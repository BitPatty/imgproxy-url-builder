import { file as initTmpFile } from 'tmp';
import { unlink } from 'fs';
import { MAGIC_MIME_TYPE, Magic } from 'mmmagic';
import { promisify } from 'util';

class TFileHandler {
  private static readonly magic: Magic = new Magic(MAGIC_MIME_TYPE);

  public static parseMagicNumber(filePath: string): Promise<string | string[]> {
    return promisify(this.magic.detectFile)(filePath);
  }

  public static initTmpFile(postfix: string): Promise<string> {
    return new Promise((resolve, reject) =>
      initTmpFile(
        {
          mode: 0o600,
          postfix,
          discardDescriptor: true,
        },
        (outerError: Error, path: string) => {
          if (outerError) reject(outerError);
          else resolve(path);
        },
      ),
    );
  }

  public static deleteFile(path: string): Promise<void> {
    return promisify(unlink)(path);
  }
}

export default TFileHandler;
