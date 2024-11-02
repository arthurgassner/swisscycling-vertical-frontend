document.addEventListener("DOMContentLoaded", function() {
    // Avatar URL for all NameRenderer instances
    const AVATAR_URL = 'https://avatars.githubusercontent.com/u/38256417?v=4&size=64';

    // Utility function to format seconds as hh:mm:ss
    function formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${secs}`;
    }

    // Custom cell renderer for Name column
    class NameRenderer {
        init(params) {
            this.eGui = document.createElement('span');
            this.eGui.className = 'imgSpanAvatar';
            this.eGui.style.display = 'flex';
            this.eGui.style.alignItems = 'center';
            this.eGui.style.height = '100%';

            const avatar = this.createAvatar();
            const nameElement = this.createNameElement(params.value);
            this.eGui.append(avatar, nameElement);
        }

        createAvatar() {
            const avatar = document.createElement('img');
            avatar.src = AVATAR_URL;
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

    // Row data with fields for grid
    const rowData = [
        { "#": 1, Name: "Arthur", Date: "2023-10-10T08:30:00", Duration: 57600 }, // 16 hours in seconds
        { "#": 2, Name: "Could be you", Date: "2023-10-09T09:00:00", Duration: 50400 }, // 14 hours in seconds
        { "#": 3, Name: "Could also be you", Date: "2023-10-08T07:45:00", Duration: 50400 },
    ];

    // Column definitions with custom renderers
    const columnDefs = [
        { field: "#", flex: 0.1 },
        { field: "Name", flex: 1, cellRenderer: NameRenderer },
        {
            field: "Date",
            flex: 0.3,
            cellRenderer: (params) => new Date(params.value).toLocaleDateString('fr-FR')
        },
        {
            field: "Duration",
            flex: 0.25,
            cellRenderer: (params) => formatDuration(params.value)
        },
    ];

    // Function to style rows based on rank
    function styleRowsByRank(params) {
        const rank = params.data["#"];
        const darkText = { color: "#333" };
        const rankStyles = {
            1: { backgroundColor: "#fde27c", ...darkText },
            2: { backgroundColor: "#e1e1e1", ...darkText },
            3: { backgroundColor: "#e6c4a2", ...darkText }
        };
        return rankStyles[rank] || null;
    }

    // Grid options with row data, column definitions, and row styling
    const gridOptions = {
        rowData,
        columnDefs,
        pagination: false,
        getRowStyle: styleRowsByRank
    };

    // Initialize the grid with the specified options
    agGrid.createGrid(document.querySelector("#js-podium"), gridOptions);
});
