import {IReviewComment, EAction} from "danger-plugin-review-aggregator"
import {readFile} from "fs-extra";
import * as glob from "fast-glob";



interface EslintResult {
  filePath: string;
  messages: any[];
  errorCount: number;
  warningCount: number;
  fixableErrorCount: number;
  fixableWarningCount: number;
  output?: string;
  source?: string;
}

export default async function parseEslint(){

}