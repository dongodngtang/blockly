const Cast = require('../util/cast');

class Scratch3EventBlocks {
  constructor (runtime) {
    /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
    this.runtime = runtime;

    this.runtime.on('KEY_PRESSED', key => {
      this.runtime.startHats('event_whenkeypressed', {
        KEY_OPTION: key
      });
      this.runtime.startHats('event_whenkeypressed', {
        KEY_OPTION: 'any'
      });
    });
    this.flag = false;
  }

  /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
  getPrimitives () {
    return {
      event_whentouchingobject: this.touchingObject,
      event_broadcast: this.broadcast,
      event_broadcastandwait: this.broadcastAndWait,
      event_whengreaterthan: this.hatGreaterThanPredicate,
      BlueTooth_start: this.blueToothStart
    };
  }

  getHats () {
    return {
      event_whenflagclicked: {
        restartExistingThreads: true
      },
      event_whenkeypressed: {
        restartExistingThreads: false
      },
      event_whenthisspriteclicked: {
        restartExistingThreads: true
      },
      event_whentouchingobject: {
        restartExistingThreads: false,
        edgeActivated: true
      },
      event_whenstageclicked: {
        restartExistingThreads: true
      },
      event_whenbackdropswitchesto: {
        restartExistingThreads: true
      },
      event_whengreaterthan: {
        restartExistingThreads: false,
        edgeActivated: true
      },
      event_whenbroadcastreceived: {
        restartExistingThreads: true
      },
      BlueTooth_start: {
        restartExistingThreads: true,
        edgeActivated: true
      }
    };
  }

  touchingObject (args, util) {
    return util.target.isTouchingObject(args.TOUCHINGOBJECTMENU);
  }

  hatGreaterThanPredicate (args, util) {
    const option = Cast.toString(args.WHENGREATERTHANMENU).toLowerCase();
    const value = Cast.toNumber(args.VALUE);
    switch (option) {
    case 'timer':
      return util.ioQuery('clock', 'projectTimer') > value;
    case 'loudness':
      return this.runtime.audioEngine && this.runtime.audioEngine.getLoudness() > value;
    }
    return false;
  }
 
  blueToothStart (args, util) {
    if (this.runtime._editingTarget.deviceName !== 'controller' ||
    !this.runtime.getPeripheralIsConnected(this.runtime._editingTarget.deviceName)){
      this.flag = false;
      return false;
    }
    const id = Cast.toNumber(args.id);
    const msg = Cast.toString(args.msg);
    this.runtime.peripheralExtensions[this.runtime._editingTarget.deviceName].writeCommand(
      `dobotlink.MagicBox.BleReadMeshData`, {portName: this.runtime.findKey(this.runtime._editingTarget.id)})
      .then(res => {
        if (id === res.devID && msg === res.data){
          this.flag = true;
        } else {
          this.flag = false;
        }
      });

      
    return this.flag;
  }

  broadcast (args, util) {
    const broadcastVar = util.runtime.getTargetForStage().lookupBroadcastMsg(
      args.BROADCAST_OPTION.id, args.BROADCAST_OPTION.name);
    if (broadcastVar) {
      const broadcastOption = broadcastVar.name;
      util.startHats('event_whenbroadcastreceived', {
        BROADCAST_OPTION: broadcastOption
      });
    }
  }

  broadcastAndWait (args, util) {
    const broadcastVar = util.runtime.getTargetForStage().lookupBroadcastMsg(
      args.BROADCAST_OPTION.id, args.BROADCAST_OPTION.name);
    if (broadcastVar) {
      const broadcastOption = broadcastVar.name;
      // Have we run before, starting threads?
      if (!util.stackFrame.startedThreads) {
        // No - start hats for this broadcast.
        util.stackFrame.startedThreads = util.startHats(
          'event_whenbroadcastreceived', {
            BROADCAST_OPTION: broadcastOption
          }
        );
        if (util.stackFrame.startedThreads.length === 0) {
          // Nothing was started.
          return;
        }
      }
      // We've run before; check if the wait is still going on.
      const instance = this;
      // Scratch 2 considers threads to be waiting if they are still in
      // runtime.threads. Threads that have run all their blocks, or are
      // marked done but still in runtime.threads are still considered to
      // be waiting.
      const waiting = util.stackFrame.startedThreads
        .some(thread => instance.runtime.threads.indexOf(thread) !== -1);
      if (waiting) {
        // If all threads are waiting for the next tick or later yield
        // for a tick as well. Otherwise yield until the next loop of
        // the threads.
        if (
          util.stackFrame.startedThreads
            .every(thread => instance.runtime.isWaitingThread(thread))
        ) {
          util.yieldTick();
        } else {
          util.yield();
        }
      }
    }
  }
}

module.exports = Scratch3EventBlocks;
