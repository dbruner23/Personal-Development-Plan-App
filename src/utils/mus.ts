export const cursorIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCSB2aWV3Qm94PSIwIDAgMjggMjgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI4IDI4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjguMiwyMC45IDguMiw0LjkgMTkuOCwxNi41IDEzLDE2LjUgMTIuNiwxNi42ICIvPjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTcuMywyMS42IDEzLjcsMjMuMSA5LDEyIDEyLjcsMTAuNSAiLz48cmVjdCB4PSIxMi41IiB5PSIxMy42IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjkyMjEgLTAuMzg3MSAwLjM4NzEgMC45MjIxIC01Ljc2MDUgNi41OTA5KSIgd2lkdGg9IjIiIGhlaWdodD0iOCIvPjxwb2x5Z29uIHBvaW50cz0iOS4yLDcuMyA5LjIsMTguNSAxMi4yLDE1LjYgMTIuNiwxNS41IDE3LjQsMTUuNSAiLz48L3N2Zz4=';

/**
     * Mus constructor that defines initial variables and
     * sets browser width and height.
     * @knownbug: if user decides to change browser window size on-the-go
     * 		it may cause bugs during playback
     */

export function Mus(this: any) {
    if (window !== undefined) {
        if (this === undefined) {
            console.error('Have you initialized Mus with "new" statement? (i.e. var mus = new Mus())');
            return;
        }
        this.frames = [];
        this.timeouts = [];
        this.pos = 0;
        this.currPos = 0;
        this.startedAt = 0;
        this.finishedAt = 0;
        this.timePoint = false;
        this.recording = false;
        this.playing = false;
        // this.playbackSpeed = this.speed.NORMAL;
        this.observer = '';
        this.window = {
            width: window.outerWidth,
            height: window.outerHeight
        };

        // Stores initial listeners
        this.onmousemove = window.onmousemove;
        this.onmousedown = window.onmousedown;
        this.onscroll = window.onscroll;
        this.inputWithUserKeyEvent = () => {
            document.querySelectorAll<HTMLElement>('textarea, input[type=text], input[type=email], input[type=number], input[type=password], input[type=tel], input[type=search], input[type=url], input[type=search], input[type=week], input[type=month], input[type=datetime-local]').forEach(element => {
                element.onkeydown = null;
            });
        };
        this.inputWithOnchangeEvent = () => {
            document.querySelectorAll<HTMLElement>('select, input[type=checkbox], input[type=radio], input[type=color], input[type=date], input[type=file], input[type=number], input[type=range], input[type=time]').forEach(element => {
                element.onchange = null;
            });
        }; 
    }
}

Mus.prototype = {

    /** Mus Listeners **/

    /**
     * Listener intended to be used with onmousemove
     * @param callback function a callback fnc
     * @return function the mouse move listener
     */
    moveListener: function (callback: (arg0: any[]) => void) {
        return function (e: { clientX: any; clientY: any; }) {
            if (callback) callback(['m', e.clientX, e.clientY]);
        }
    },

    /**
     * Listener intended to be used with onmousedown
     * @param callback function a callback fnc
     * @return function the mouse click listener
     */
    clickListener: function (callback: (arg0: any[]) => void) {
        return function (e: { clientX: any; clientY: any; }) {
            if (callback) callback(['c', e.clientX, e.clientY]);
        }
    },

    /**
     * Listener intended to be used with onscroll
     * @param callback function a callback fnc
     * @return function the window scroll listener
     */
    scrollListener: function (callback: (arg0: (string | number)[]) => void) {
        return function (e: any) {
            if (callback && document.scrollingElement) callback(['s', document.scrollingElement.scrollLeft, document.scrollingElement.scrollTop]);
        }
    },

    /** Mus recording tools **/

    /**
     * Starts screen recording
     */

    record: function (onFrame: () => void) {
        if (this.recording) return;
        
        if (this.startedAt == 0) this.startedAt = new Date().getTime() / 1000;

        // Sets initial scroll position of the window
        if (this.timePoint) {
            if (document.scrollingElement) this.frames.push(['s', document.scrollingElement.scrollLeft, document.scrollingElement.scrollTop, 0]);
        } else {
            if (document.scrollingElement) this.frames.push(['s', document.scrollingElement.scrollLeft, document.scrollingElement.scrollTop]);
        }

        window.onmousemove = this.moveListener((pos: any[]) => {
            this.frames.push(this.timePoint ? pos.concat(new Date().getTime() - (this.startedAt * 1000)) : pos);
            if (onFrame instanceof Function) onFrame();
        });
        window.onmousedown = this.clickListener((click: any[]) => {
            this.frames.push(this.timePoint ? click.concat(new Date().getTime() - (this.startedAt * 1000)) : click);
            if (onFrame instanceof Function) onFrame();
        });
        window.onscroll = this.scrollListener((scroll: any[]) => {
            this.frames.push(this.timePoint ? scroll.concat(new Date().getTime() - (this.startedAt * 1000)) : scroll);
            if (onFrame instanceof Function) onFrame();
        });

        this.recording = true;
    },

    stop: function () {
        this.finishedAt = new Date().getTime() / 1000;
        window.onmousemove = this.onmousemove;
        window.onmousedown = this.onmousedown;
        window.onscroll = this.onscroll;
        // this.inputWithUserKeyEvent();
        // this.inputWithOnchangeEvent();
        if (this.observer != '') this.observer.disconnect();
        // Sets our recording flag
        this.timeouts = [];
        this.recording = false;
        this.playing = false;
        this.pos = 0;
    },

    timeElapsed: function () {
        return this.finishedAt - this.startedAt;
    },

    /** Public getters and setters **/

    /**
     * Get all generated Mus data
     * @return array generated Mus data
     */

    getData: function () {
        return {
            frames: this.frames,
            timeElapsed: this.timeElapsed(),
            window: {
                width: window.outerWidth,
                height: window.outerHeight
            }
        };
    },

    /**
     * Get point time recording flag
     * @return boolean point time flag
     */
    isTimePoint: function () {
        return this.timePoint;
    },

    /**
     * Sets generated Mus data for playback
     * @param data array generated Mus data
     */
    setData: function (data: { frames: any; window: any; }) {
        if (data.frames) this.frames = data.frames;
        if (data.window) this.window = data.window;
    },

    /**
     * Sets recorded frames for playback
     * @param frames array the frames array
     */
    setFrames: function (frames: any) {
        this.frames = frames;
    },

    /**
     * Sets custom window size for playback
     * @param width integer window width
     * @param height integer window height
     */
    setWindowSize: function (width: any, height: any) {
        this.window.width = width;
        this.window.height = height;
    },

    /**
     * Sets a playback speed based on Mus speed set
     * @param speed integer the playback speed
     */
    setPlaybackSpeed: function (speed: any) {
        this.playbackSpeed = speed;
    },

    /**
     * Sets point time recording for accurate data
     * @param 
     */
    setTimePoint: function (timePoint: any) {
        this.timePoint = timePoint;
    },

    isRecording: function () {
        return this.recording;
    },

    getMousemoveCoordinates: function (frames: any) {
        const mousemovecoords: any[] = []
        for (let i = 0; i < frames.length - 1; i++) {
            if (frames[i][0] === "m") {
                mousemovecoords.push([frames[i][1], frames[i][2]])
            }
        }
        return mousemovecoords
    },

    getClickCoordinates: function (frames:any) {
        const clickcoords: any = []
        for (let i = 0; i < frames.length - 1; i++) {
            if (frames[i][0] === "c") {
                clickcoords.push([frames[i][1], frames[i][2]])
            }
        }
        return clickcoords
    },

    getScrollCoordinates: function (frames:any) {
        const scrollcoords: any = []
        for (let i = 0; i < frames.length - 1; i++) {
            if (frames[i][0] === "s") {
                scrollcoords.push([frames[i][1], frames[i][2]])
            }
        }
        return scrollcoords
    },

    timeSlice: function (startedAt : any) {
        const time = (new Date().getTime() / 1000 - (startedAt))
        return time
    },

    // toggleRecord: function (isRecording:any, record: any, stop:any, getMousemoveCoordinates:any, timeSlice:any, getClickCoordinates:any ) {
    //     if (!isRecording()) {
    //         record(getMousemoveCoordinates);
    //     } else {
    //         stop();
    //         const time = timeSlice()
    //         const mousemove = getMousemoveCoordinates();
    //         const clicks = getClickCoordinates();
    //         console.log("time: " + time + " mousemove: " + mousemove + "clicks: " + clicks)
    //     }
    // },


}