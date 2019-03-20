import {IReviewComment, EAction} from "danger-plugin-review-aggregator"
import {readFile} from "fs-extra";
import {relative} from "path";
import {CLIEngine, Linter} from "eslint";


export async function parseEslint(eslintResultPath:string):Promise<IReviewComment[]> {
  const eslintResults:CLIEngine.LintResult[] = JSON.parse((await readFile(eslintResultPath)).toString());
  return eslintResults.map(({filePath, messages}) => {
    const file = relative(process.cwd(), filePath);
    return messages.map<IReviewComment>(eslintMessageToReviewComment.bind(null, file));
  }).reduce((acc, comments) => [...acc, ...comments], []);
}

function eslintMessageToReviewComment(file:string, message:Linter.LintMessage):IReviewComment{
  return {
    action: eslintServerityToReviewAction(message.severity),
    message: message.message,
    file: file,
    line: message.line
  };
}

function eslintServerityToReviewAction(severity:Linter.Severity){
  return {
    1 : EAction.warn,
    2 : EAction.fail
  }[severity] || EAction.message;
}