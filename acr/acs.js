var acr = {
    lang: async function () {
        var lang;
        try {
            lang = await fetch("acr/lang/" + navigator.language.slice(0, 2) + ".json");
        } catch {
            lang = await fetch("acr/lang/en.json");
        }
        return (this.lang = await lang.json());
    },
    restored: false,
    font: {
        affected: false,
        size: localStorage.getItem("acr_font") || 0,
        change: function (newsize) {
            if (newsize != this.size || !this.__PARENT.restored) {
                if (this.size != 0)
                    document.body.classList.remove('acr_font' + this.size);
                if (newsize != 0)
                    document.body.classList.add('acr_font' + newsize);
                this.size = newsize;
                if (this.__PARENT.restored)
                    localStorage.setItem("acr_font", this.size);
                this.affected = true;
            }
        }
    },
    cscheme: {
        affected: false,
        mode: localStorage.getItem("acr_cscheme") || 0,
        change: function (newcolor) {
            if (newcolor != this.mode || !this.__PARENT.restored) {
                if (this.mode != 0)
                    document.body.classList.remove('acr_cscheme' + this.mode);
                if (newcolor != 0)
                    document.body.classList.add('acr_cscheme' + newcolor);
                this.mode = newcolor;
                if (this.__PARENT.restored)
                    localStorage.setItem("acr_cscheme", this.mode);
                this.affected = true;
            }
        }
    },
    restore: function () {
        if (!this.restored) {
            if (this.font.affected)
                localStorage.setItem("acr_font", this.font.size);
            else
                this.font.size = localStorage.getItem("acr_font") || 0;
            if (this.cscheme.affected)
                localStorage.setItem("acr_cscheme", this.cscheme.mode);
            else
                this.cscheme.mode = localStorage.getItem("acr_cscheme") || 0;
            this.restored = true;
        }
    },
    panel: {
        state: false,
        toggle: function (lang) {
            if (this.state)
                document.querySelector("#acr_panel").remove();
            else
                document.body.insertAdjacentHTML('beforeend', `<div id='acr_panel'><div><span onclick='acr.panel()' alt='` + lang.panel.close + `'></span>
                <strong>` + lang.panel.title + `</strong>
                <p>` + lang.panel.cscheme.title + `</p><section><p onclick='acr.cscheme(0)'>` + lang.panel.cscheme.standard + `</p><p class='blackwhite' onclick='acr.cscheme(1)'>` + lang.panel.cscheme.blackwhite + `</p><p class='blackyellow' onclick='acr.cscheme(2)'>` + lang.panel.cscheme.blackyellow + `</p><p class='whiteblack' onclick='acr.cscheme(3)'>` + lang.panel.cscheme.whiteblack + `</p></section>
                <p>` + lang.panel.font.title + `</p><section style="font-size: medium"><p onclick='acr.font(0)'>` + lang.panel.font.standard + `</p><p class='large' onclick='acr.font(1)'>` + lang.panel.font.large + `</p><p class='biglarge' onclick='acr.font(2)'>` + lang.panel.font.biglarge + `</p></section>
                <a href="https://github.com/adam3278/acr">` + lang.panel.credicts + `</a></div></div>`);
            this.state = !this.state;
        }
    },
    interface: {
        font: function (size) { this.__ACR.font.change(size) },
        cscheme: function (color) { this.__ACR.cscheme.change(color) },
        panel: async function () { this.__ACR.panel.toggle(this.__ACR.lang.constructor == Object ? this.__ACR.lang : await this.__ACR.lang()) },
        restore: function () {
            this.__ACR.restore();
            if (this.__ACR.cscheme.mode != 0)
                document.body.classList.add('acr_cscheme' + this.__ACR.cscheme.mode);
            if (this.__ACR.font.size != 0)
                document.body.classList.add('acr_font' + this.__ACR.font.size);
        }
    }
}
acr.font.__PARENT = acr.cscheme.__PARENT = acr;
Object.defineProperty(acr.interface, "__ACR", {
    "value": acr
});
document.addEventListener('click', function (ev) {
   if (ev.target.id == 'acr_button')
       window.acr.panel();
});
window.acr = acr.interface
