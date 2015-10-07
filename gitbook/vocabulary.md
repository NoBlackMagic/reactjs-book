# Vocabulary

## transpiling

Is the act of transforming a language into another language. In our case we write our source files in _EC6_ and _EC7_ but [Webpack](http://webpack.github.io/) uses a plugin (Babel) to transform them into _EC5_ so the current browsers can excute the code.

## bundling / bundle

Is the act of merging a set of source files into one single (well, it can be more than one) that the browser will execute. We use [Webpack](http://webpack.github.io/) to perform this operation and benefit from features like _modules loading_ and _transpiling_.

> "_bundle_" is the name of the final prouct of the _bundling_ action.