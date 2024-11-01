document.addEventListener("DOMContentLoaded", function() {
    class NameRenderer {
        eGui;
        init(params) {
            let avatar = document.createElement('img');
            avatar.src = `https://avatars.githubusercontent.com/u/38256417?v=4&size=64`;
            avatar.setAttribute('class', 'logo');
            avatar.style.height = '80%';
            avatar.style.width = 'auto';

            let name = document.createElement('span');
            name.textContent = params.value;
            name.style.marginLeft = '8px';
            name.style.alignSelf = 'center';

            this.eGui = document.createElement('span');
            this.eGui.setAttribute('class', 'imgSpanAvatar');
            this.eGui.style.display = 'flex';
            this.eGui.style.alignItems = 'center';
            this.eGui.style.height = '100%';

            this.eGui.appendChild(avatar);
            this.eGui.appendChild(name);
        }

        getGui() {
            return this.eGui;
        }

        refresh(params) {
            return false;
        }
    }

    const gridOptions = {
        rowData: [
            { Rank: 1, Name: "Arthur", Date: 64950, Time: "16h" },
            { Rank: 2, Name: "Could be you", Date: 33850, Time: "14h" },
            { Rank: 3, Name: "Could also be you", Date: 29600, Time: "14h" },
        ],
        columnDefs: [
            { field: "Rank", flex: 0.5 },
            { field: "Name", flex: 2, cellRenderer: NameRenderer },
            { field: "Date", flex: 1 },
            { field: "Time", flex: 1 },
        ],
        pagination: false,
        getRowStyle: (params) => {
            const darkText = { color: "#333" }; // Dark text color
            if (params.data.Rank === 1) {
                return { backgroundColor: "#fde27c", ...darkText }; // Gold
            } else if (params.data.Rank === 2) {
                return { backgroundColor: "#e1e1e1", ...darkText }; // Silver
            } else if (params.data.Rank === 3) {
                return { backgroundColor: "#e6c4a2", ...darkText }; // Bronze
            }
        }
    };

    agGrid.createGrid(document.querySelector("#js-podium"), gridOptions);
});
