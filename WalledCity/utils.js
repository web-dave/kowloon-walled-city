class Utils{
    constructor() {
    }

    randomInRange(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    notWithin30Pixels(min, max, rolls){
        let roll = this.randomInRange(min, max) * 2;
        for(let i=0;i<rolls.length;i++){
            if(Math.abs(roll - rolls[i]) < 30){
                return this.notWithin30Pixels(min, max, rolls);
            }
        }
        return roll;
    }

    notPreviousRoll(min, max, rolls){
        let roll = this.randomInRange(min, max);
        if(roll === rolls.pop()){
            return this.notPreviousRoll(min, max, rolls);
        }
        return roll;
    }

    getBackgroundImages(node){
        let styles = this.getStyles(node);
        let background_images = [];

        styles.forEach(function (v, k) {
            if(k === "background-image"){
                background_images = v.split(',');
            }
        });
        return background_images;
    }

    getStyles(node){
        let styles = node.domElement.getAttribute('style');
        let style_map = new Map();
        if(styles){
            styles = styles.split(";");
            for(let i=0;i<styles.length;i++){
                let property = styles[i].split(":")[0];
                let value = styles[i].split(":")[1];
                style_map.set(property, value);
            }
        }
        return style_map;
    }

    addBackgroundImage(node, src){
        let background_images = this.getBackgroundImages(node);
        background_images.push('url('+src+')');
        background_images = background_images.join(',');

        let styles = this.getStyles(node);
        styles.set("background-image",background_images);

        let style_string = "";
        styles.forEach(function (v, k) {
            let new_style = k + ":" + v + ";";
            style_string += new_style;
        });

        node.domElement.setAttribute('style', style_string);
    }

    removeBackgroundImages(node){
        let styles = this.getStyles(node);
        styles.delete("background-image");

        let style_string = "";
        styles.forEach(function (v, k) {
            let new_style = k + ":" + v + ";";
            style_string += new_style;
        });

        node.domElement.setAttribute('style', style_string);
    }

    getLobbyNode(tower){
        let lobby_nodes = tower.getFloor(6).node_list;
        for(let i=0;i<lobby_nodes.length;i++){
            if(lobby_nodes[i].domElement.classList[1] === "lobby"){
                return lobby_nodes[i];
            }
        }
        return false;
    }

    isOccupied(node){
        if(node.domElement.classList.length > 1){
            if(node.domElement.classList[1].includes("occupied") ||
                node.domElement.classList[1].includes("empty") ){
                return true;
            }
        }
        return false;
    }

    nodeIsConnected(node, tower){
        return tower.getFloor(node.floor_id).connected;
    }
}