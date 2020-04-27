class GUI{
    constructor(tower) {
        this.toolbar = new Toolbar(this);
        this.pointer = "pointer";
        this.tower = tower;
        this.gameboard = document.getElementById("gameboard");
        this.dragging = false;
        this.nodes_hovered = new Map();
    }

    run(){
        this.toolbar.run();
        let nodes = document.getElementsByClassName("node");
        for(let i=0;i<nodes.length;i++){
            nodes[i].addEventListener('click', this.nodeClick.bind(this), false);
            nodes[i].addEventListener('mouseover', this.nodeHover.bind(this), false);
        }

        this.gameboard.addEventListener('mousedown', this.handleMouseDownGameboard.bind(this), false);
        this.gameboard.addEventListener('mouseup', this.handleMouseUpGameboard.bind(this), false);
    }

    drawNode(node){
        switch(this.pointer){
            case "lobby":
                let lobby = new Lobby(node, this.tower);
                lobby.draw();
                break;
            case "tenant":
                let tenant = new Tenant(node, this.tower);
                tenant.draw();
                break;
            case "residential":
                let residential_residence = new ResidentialResidence(node, this.tower);
                residential_residence.draw();
                break;
            case "commercial":
                let commercial_residence = new CommercialResidence(node, this.tower);
                commercial_residence.draw();
                break;
            case "industrial":
                let industrial_residence = new IndustrialResidence(node, this.tower);
                industrial_residence.draw();
                break;
            default:
                break;
        }
    }

    nodeClick(event){
        let node = this.getNodeFromEvent(event);
        this.drawNode(node);
    }

    nodeHover(event){
        let node = this.getNodeFromEvent(event);
        this.nodes_hovered.set(node, true);

        if(this.dragging === true){
            this.drawNode(node);
        }
    }

    updatePointer(pointer){
        let cursor_styles = document.createElement('style');

        switch(pointer){
            case "residential":
                cursor_styles.innerText = "body{cursor:url('img/gui/residential-ico.png'), pointer;}";
                break;
            case "commercial":
                cursor_styles.innerText = "body{cursor:url('img/gui/commercial-ico.png'), pointer;}";
                break;
            case "industrial":
                cursor_styles.innerText = "body{cursor:url('img/gui/industrial-ico.png'), pointer;}";
                break;
            case "lobby":
                cursor_styles.innerText = "body{cursor:url('img/gui/lobby-ico.png'), pointer;}";
                break;
            case "tenant":
                cursor_styles.innerText = "body{cursor:url('img/gui/tenant-ico.png'), pointer;}";
                break;
            default:
                cursor_styles.innerText = "body{cursor: pointer;}";
                break
        }

        this.pointer = pointer;
        document.head.append(cursor_styles);
    }

    handleMouseDownGameboard(event){
        this.nodes_hovered.clear();
        this.dragging = true;
    }

    handleMouseUpGameboard(event){
        this.dragging = false;
    }

    getNodeFromEvent(event){
        let position = parseInt(event.target.id.split('_')[2]);
        let floor = parseInt(event.target.id.split('_')[1]);
        return this.tower.getFloor(floor).getNode(position);
    }
}