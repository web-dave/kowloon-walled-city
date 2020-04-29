class Game {
    constructor(){
        this.width = 1336;
        this.height = 1024;
        this.demand = new Demand(3, 1, 15);
        this.tower = new Tower(this.demand);
        this.bank_account = new BankAccount(350000);
        this.gui = new GUI(this.tower, this.bank_account);
    }

    setup(){
        const gameboard = document.getElementById("gameboard");
        const utils = new DrawUtils();
        const random_utils = new RandomUtils();

        let total_floors = 2400 / 50;
        for(let i=0;i<total_floors;i++){
            let new_floor_div = document.createElement('div');
            new_floor_div.classList.add("floor");

            if(i < 6){
                new_floor_div.classList.add("underground-bg");
                new_floor_div.classList.add("ubg-"+i);
            } else {
                new_floor_div.classList.add("sky-bg");
            }

            new_floor_div.id = "floor_" + i;
            gameboard.prepend(new_floor_div);

            let new_node_container = document.createElement('div');
            new_node_container.className = "node-container";

            let new_floor_dom = document.getElementById(new_floor_div.id);
            new_floor_dom.append(new_node_container);

            // Populate floor nodes
            let new_floor = new Floor(i, this.tower);
            let total_floor_nodes = Math.floor(this.width / 48);
            for(let j=0;j<total_floor_nodes;j++){
                let new_node_div = document.createElement('div');
                new_node_div.className = "node";
                new_node_div.id = "node_" + i + "_" + j;
                new_node_container.append(new_node_div);

                let new_node = new Node(i, j);
                new_floor.setNode(new_node);
            }
            this.tower.addFloor(new_floor);
        }

        // Decorate the ground floor
        let ground_floor = document.getElementById("floor_6");
        let positions = [];
        let props = [];
        for(let j=0;j<20;j++){

            let prop = random_utils.notPreviousRoll(1, 6, props);
            let new_decoration = document.createElement('div');
            let position = 0;

            if(prop === 1){
                position = utils.notWithin30Pixels(1, 662, positions);
                new_decoration.className = "birb";
            }
            if(prop === 2){
                position = utils.notWithin30Pixels(1, 648, positions);
                new_decoration.className = "tree-solid";
            }
            if(prop === 3){
                position = utils.notWithin30Pixels(1, 650, positions);
                new_decoration.className = "bench";
            }
            if(prop === 4){
                position = utils.notWithin30Pixels(1, 648, positions);
                new_decoration.className = "tree-hollow";
            }
            if(prop === 5){
                position = utils.notWithin30Pixels(1, 644, positions);
                new_decoration.className = "fence-small";
            }

            positions.push(position);
            props.push(prop);
            new_decoration.setAttribute("style","left: "+position+"px;");
            ground_floor.append(new_decoration);
        }
        let bus = document.createElement('div');
        bus.className = "bus";
        ground_floor.append(bus);

        gameboard.scrollTop = gameboard.scrollHeight;
    }

    run(){
        // Initialize GUI
        this.gui.run();

        // Debug demand
        this.demand.outputDemand();

    }
}