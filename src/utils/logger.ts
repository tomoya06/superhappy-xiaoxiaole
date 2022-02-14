const wConsole = window.console;
const isDev = import.meta.env.MODE === "development";

(window as any).console = (function () {
  if (isDev) {
    return wConsole;
  }

  return {
    log: () => {},
    error: wConsole.error,
  };
})();

if (!isDev) {
  wConsole.log("欢迎来到男足消消乐的后台");
  wConsole.log("既然你来到了这里，那你一定是想做些出格的事情吧");
  wConsole.log(
    "分数魔改方式：修改 localStorage 里跟本游戏分数长得最像的一项即可"
  );
}

export {};
