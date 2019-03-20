import {IReviewComment, EAction} from "danger-plugin-review-aggregator"
import {relative} from "path";
import {CLIEngine, Linter} from "eslint";

const PROJECT_ROOT = process.env.PROJECT_ROOT || process.cwd();

export async function parseEslint(eslintReviewResult:string):Promise<IReviewComment[]> {
  const eslintResults:CLIEngine.LintResult[] = JSON.parse(eslintReviewResult);
  return eslintResults.map(({filePath, messages}) => {
    const file = relative(PROJECT_ROOT, filePath);
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