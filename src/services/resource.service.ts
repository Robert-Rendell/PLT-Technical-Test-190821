import * as fs from 'fs';
import * as path from 'path';

import { Service } from "typedi";

@Service()
export class ResourceService {
  /**
   * POTENTIAL IMPROVEMENT - use async/await version of readFile and handle the promise
   */
  public getTextFromFile(filename: string): string {
    return fs.readFileSync(
      this.getResourcesPath(filename),
      'utf8'
    );
  }

  private getResourcesPath(filename: string): string {
    return path.join(process.cwd(), 'resources', filename);
  }
}
