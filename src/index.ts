import {IReviewComment, EAction} from "danger-plugin-review-aggregator"
import {relative} from "path";
import {CLIEngine, Linter} from "eslint";

export function initEslintParser(projectRoot?:string):(eslintReviewResult:string) => Promise<IReviewComment[]>{
  return parseEslint.bind(null, projectRoot || process.env.PROJECT_ROOT || process.cwd());
}

async function parseEslint(projectRoot:string, eslintReviewResult:string):Promise<IReviewComment[]> {
  const eslintResults:CLIEngine.LintResult[] = JSON.parse(eslintReviewResult);
  return eslintResults.map(({filePath, messages}) => {
    const file = relative(projectRoot, filePath);
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