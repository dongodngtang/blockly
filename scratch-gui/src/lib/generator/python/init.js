// import * as Blockly from 'scratch-blocks';

/**
 * Python code generator.
 * @type {!Blockly.Generator}
 */
Blockly.Python = new Blockly.Generator('Python');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Python.addReservedWords(
  'False,None,True,and,as,assert,break,class,continue,def,del,elif,else,' +
  'except,exec,finally,for,from,global,if,import,in,is,lambda,nonlocal,not,' +
  'or,pass,print,raise,return,try,while,with,yield,' +
  'NotImplemented,Ellipsis,__debug__,quit,exit,copyright,license,credits,' +
  'ArithmeticError,AssertionError,AttributeError,BaseException,' +
  'BlockingIOError,BrokenPipeError,BufferError,BytesWarning,' +
  'ChildProcessError,ConnectionAbortedError,ConnectionError,' +
  'ConnectionRefusedError,ConnectionResetError,DeprecationWarning,EOFError,' +
  'Ellipsis,EnvironmentError,Exception,FileExistsError,FileNotFoundError,' +
  'FloatingPointError,FutureWarning,GeneratorExit,IOError,ImportError,' +
  'ImportWarning,IndentationError,IndexError,InterruptedError,' +
  'IsADirectoryError,KeyError,KeyboardInterrupt,LookupError,MemoryError,' +
  'ModuleNotFoundError,NameError,NotADirectoryError,NotImplemented,' +
  'NotImplementedError,OSError,OverflowError,PendingDeprecationWarning,' +
  'PermissionError,ProcessLookupError,RecursionError,ReferenceError,' +
  'ResourceWarning,RuntimeError,RuntimeWarning,StandardError,' +
  'StopAsyncIteration,StopIteration,SyntaxError,SyntaxWarning,SystemError,' +
  'SystemExit,TabError,TimeoutError,TypeError,UnboundLocalError,' +
  'UnicodeDecodeError,UnicodeEncodeError,UnicodeError,' +
  'UnicodeTranslateError,UnicodeWarning,UserWarning,ValueError,Warning,' +
  'ZeroDivisionError,_,__build_class__,__debug__,__doc__,__import__,' +
  '__loader__,__name__,__package__,__spec__,abs,all,any,apply,ascii,' +
  'basestring,bin,bool,buffer,bytearray,bytes,callable,chr,classmethod,cmp,' +
  'coerce,compile,complex,copyright,credits,delattr,dict,dir,divmod,' +
  'enumerate,eval,exec,execfile,exit,file,filter,float,format,frozenset,' +
  'getattr,globals,hasattr,hash,help,hex,id,input,int,intern,isinstance,' +
  'issubclass,iter,len,license,list,locals,long,map,max,memoryview,min,' +
  'next,object,oct,open,ord,pow,print,property,quit,range,raw_input,reduce,' +
  'reload,repr,reversed,round,set,setattr,slice,sorted,staticmethod,str,' +
  'sum,super,tuple,type,unichr,unicode,vars,xrange,zip');

/**
 * Order of operation ENUMs.
 * http://docs.python.org/reference/expressions.html#summary
 */
Blockly.Python.ORDER_ATOMIC = 0; // 0 "" ...
Blockly.Python.ORDER_COLLECTION = 1; // tuples, lists, dictionaries
Blockly.Python.ORDER_STRING_CONVERSION = 1; // `expression...`
Blockly.Python.ORDER_MEMBER = 2; // . []
Blockly.Python.ORDER_FUNCTION_CALL = 2; // ()
Blockly.Python.ORDER_EXPONENTIATION = 3; // **
Blockly.Python.ORDER_UNARY_SIGN = 4; // + -
Blockly.Python.ORDER_BITWISE_NOT = 4; // ~
Blockly.Python.ORDER_MULTIPLICATIVE = 5; // * / // %
Blockly.Python.ORDER_ADDITIVE = 6; // + -
Blockly.Python.ORDER_BITWISE_SHIFT = 7; // << >>
Blockly.Python.ORDER_BITWISE_AND = 8; // &
Blockly.Python.ORDER_BITWISE_XOR = 9; // ^
Blockly.Python.ORDER_BITWISE_OR = 10; // |
Blockly.Python.ORDER_RELATIONAL = 11; // in, not in, is, is not,
//     <, <=, >, >=, <>, !=, ==
Blockly.Python.ORDER_LOGICAL_NOT = 12; // not
Blockly.Python.ORDER_LOGICAL_AND = 13; // and
Blockly.Python.ORDER_LOGICAL_OR = 14; // or
Blockly.Python.ORDER_CONDITIONAL = 15; // if else
Blockly.Python.ORDER_LAMBDA = 16; // lambda
Blockly.Python.ORDER_NONE = 99; // (...)
// eslint-disable-next-line max-len
Blockly.Python.Header = `#devType: ML\nfrom System.ScratchApi import mgl\nfrom System.ScratchApi import mb`;

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Python.init = function(workspace) {
  /**
   * Empty loops or conditionals are not allowed in Python.
   */
  Blockly.Python.PASS = `${this.INDENT}pass\n`;
  // Create a dictionary of definitions to be printed before the code.
  // Blockly.Python.definitions_ = Object.create(null);
  Blockly.Python.definitions_ = {
    ml: `#devType: ML`,
    rail: `#isUsingRail: False\n`,
    mgl: 'from System.ScratchApi import mgl',
    mb: 'from System.ScratchApi import mb\n'
  };

  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Python.functionNames_ = Object.create(null);

  if (Blockly.Python.variableDB_) {
    Blockly.Python.variableDB_.reset();
  } else {
    Blockly.Python.variableDB_ =
        new Blockly.Names(Blockly.Python.RESERVED_WORDS_);
  }

  // const defvars = [];
  // const variables = Blockly.Variables.allVariables(workspace);
  // for (let i = 0; i < variables.length; i++) {
  //   debugger;
  //   defvars[i] = defvars[i].name ? `${defvars[i].name}` : `${Blockly.Python.variableDB_.getName(variables[i],
  //     Blockly.Variables.NAME_TYPE)} = None`;
  // }
  // Blockly.Python.definitions_.variables = defvars.join('\n');
  Blockly.Python.tabPos = 1;
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Python.finish = function(code) {
  // Convert the definitions dictionary into a list.
  const imports = [];
  const definitions = [];
  for (const name in Blockly.Python.definitions_) {
    const def = Blockly.Python.definitions_[name];
    if (def.match(/^(from\s+\S+\s+)?import\s+\S+/)) {
      imports.push(def);
    } else {
      definitions.push(def);
    }
  }
  // Clean up temporary data.
  delete Blockly.Python.definitions_;
  delete Blockly.Python.functionNames_;
  Blockly.Python.variableDB_.reset();
  let allDefs = `${definitions.join('\n')}${imports.join('\n')}\n`.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n');
  allDefs += 'def work():\n';
  allDefs += `${code}`;
  allDefs += `work()`;
  return allDefs;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Python.scrubNakedValue = function(line) {
  return `${line}\n`;
};

/**
 * Encode a string as a properly escaped Python string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Python string.
 * @private
 */
Blockly.Python.quote_ = function(string) {
  // Can't use goog.string.quote since % must also be escaped.
  string = string.replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\\n')
    .replace(/%/g, '\\%')
    .replace(/'/g, '\\\'');
  return `'${string}'`;
};

/**
 * Common tasks for generating Python from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Python code created for this block.
 * @return {string} Python code with comments and subsequent blocks added.
 * @private
 */
Blockly.Python.scrub_ = function(block, code) {
  let commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    let comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, this.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        // Use a comment block for function comments.
        commentCode += `"""${comment}\n"""\n`;
      } else {
        commentCode += Blockly.Python.prefixLines(`${comment}\n`, '# ');
      }
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (let x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type === Blockly.INPUT_VALUE) {
        const childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          comment = Blockly.Python.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Python.prefixLines(comment, '# ');
          }
        }
      }
    }
  }
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  const nextCode = Blockly.Python.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};
Blockly.Python.tab = function(){
  return Blockly.Python.INDENT.repeat(Blockly.Python.tabPos);
};
Blockly.Python.END = '\n';

Blockly.Python.getExtensionDropdown = function(block, name) {
  let res = '';
  block.getChildren().forEach(child => {
    child.inputList.forEach(input => {
      input.fieldRow.forEach(field => {
        if (field.name === name) {
          res = field.value_;
        }
      });
    });
  });
  return res;
};
