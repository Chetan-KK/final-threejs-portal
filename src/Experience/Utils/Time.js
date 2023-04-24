import EventEmitter from "events";

export default class Time extends EventEmitter {
    constructor () {
        super();

        //options
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        //first animation frame
        window.requestAnimationFrame(() => {
            this.tick();
        });
    }
    tick() {

        //update elapsed time
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;

        this.emit('update');

        window.requestAnimationFrame(() => {
            this.tick();
        });
    }

}