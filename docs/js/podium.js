document.addEventListener("DOMContentLoaded", function() {
    class NameRenderer {
        eGui;

        init(params) {
            const avatar = this.createAvatar();
            const name = this.createNameElement(params.value);

            this.eGui = document.createElement('span');
            this.eGui.className = 'imgSpanAvatar';
            this.eGui.style.display = 'flex';
            this.eGui.style.alignItems = 'center';
            this.eGui.style.height = '100%';

            this.eGui.append(avatar, name);
        }

        createAvatar() {
            const avatar = document.createElement('img');
            avatar.src = `https://avatars.githubusercontent.com/u/38256417?v=4&size=64`;
            avatar.className = 'logo';
            avatar.style.height = '80%';
            avatar.style.width = 'auto';
            return avatar;
        }

        createNameElement(value) {
            const name = document.createElement('span');
            name.textContent = value;
            name.style.marginLeft = '8px';
            name.style.alignSelf = 'center';
            return name;
        }

        getGui() {
            return this.eGui;
        }

        refresh() {
            return false;
        }
    }

    const rowData = [
        { Rank: 1, Name: "Arthur", Date: "2023-10-10T08:30:00", Duration: "16h", Link: 'some link'},
        { Rank: 2, Name: "Could be you", Date: "2023-10-09T09:00:00", Duration: "14h", Link: 'some link'},
        { Rank: 3, Name: "Could also be you", Date: "2023-10-08T07:45:00", Duration: "14h", Link: 'some link'},
    ];

    const columnDefs = [
        { field: "Rank", flex: 0.5 },
        { field: "Name", flex: 2, cellRenderer: NameRenderer },
        {
            field: "Date",
            flex: 0.8,
            cellRenderer: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString('fr-FR');
            }
        },
        { field: "Duration", flex: 0.7 },
        { field: "Strava Link", flex: 0.8 },
    ];

    const gridOptions = {
        rowData,
        columnDefs,
        pagination: false,
        getRowStyle: styleRowsByRank
    };

    function styleRowsByRank(params) {
        const darkText = { color: "#333" }; // Dark text color
        switch (params.data.Rank) {
            case 1:
                return { backgroundColor: "#fde27c", ...darkText }; // Gold
            case 2:
                return { backgroundColor: "#e1e1e1", ...darkText }; // Silver
            case 3:
                return { backgroundColor: "#e6c4a2", ...darkText }; // Bronze
            default:
                return null;
        }
    }

    agGrid.createGrid(document.querySelector("#js-podium"), gridOptions);
});
