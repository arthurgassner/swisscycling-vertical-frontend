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
        { "#": 1, Name: "Arthur", Date: "2023-10-10T08:30:00", Duration: 37600}, // 16 hours in seconds
        { "#": 2, Name: "Could be you", Date: "2023-10-09T09:00:00", Duration: 50400}, // 14 hours in seconds
        { "#": 3, Name: "Could also be you", Date: "2023-10-08T07:45:00", Duration: 50400},
    ];

    const columnDefs = [
        { field: "#", flex: 0.25 },
        { field: "Name", flex: 1, cellRenderer: NameRenderer },
        {
            field: "Date",
            flex: 0.4,
            cellRenderer: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString('fr-FR');
            }
        },
        {
            field: "Duration",
            flex: 0.7,
            cellRenderer: (params) => formatDuration(params.value)
        },
    ];

    const gridOptions = {
        rowData,
        columnDefs,
        pagination: false,
        getRowStyle: styleRowsByRank
    };

    function formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
    
        return `${hours}:${minutes}:${secs}`;
    }
    

    function styleRowsByRank(params) {
        const darkText = { color: "#333" };
        switch (params.data["#"]) {
            case 1:
                return { backgroundColor: "#fde27c", ...darkText };
            case 2:
                return { backgroundColor: "#e1e1e1", ...darkText };
            case 3:
                return { backgroundColor: "#e6c4a2", ...darkText };
            default:
                return null;
        }
    }

    agGrid.createGrid(document.querySelector("#js-podium"), gridOptions);
});
