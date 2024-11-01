# Leaderboard

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/dist/styles/ag-theme-alpine-dark.css">
<script src="https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js"></script>
<div id="myGrid" style="width: 100%; height: 350px;" class="ag-theme-alpine-dark"></div>

<script>
document.addEventListener("DOMContentLoaded", function() {

    // Custom cell renderer for the name column
    function nameCellRenderer(params) {
        const name2ImageURL = {
            "Arthur": "https://avatars.githubusercontent.com/u/38256417?v=4&size=64",
        };
        
        const name = params.value;
        const ImgURL = name2ImgURL[name] || "";
        
        return `
            <div style="display: flex; align-items: center;">
                <img src="${ImgURL}" alt="${name}" style="width: 20px; height: auto; margin-right: 5px;" />
                ${name}
            </div>
        `;
    }

    class NameRenderer {
        eGui;

        // Optional: Params for rendering. The same params that are passed to the cellRenderer function.
        init(params) {
            // Create the avatar image
            let avatar = document.createElement('img');
            avatar.src = `https://avatars.githubusercontent.com/u/38256417?v=4&size=64`;
            avatar.setAttribute('class', 'logo');
            avatar.style.height = '80%'; // Fill the height of the parent
            avatar.style.width = 'auto';   // Maintain aspect ratio

            // Create a span for the name
            let name = document.createElement('span');
            name.textContent = params.value; // Assuming the name comes from params.value
            name.style.marginLeft = '8px';   // Add some space between the image and the name
            name.style.alignSelf = 'center';  // Center the name vertically within the row

            // Create the container for the avatar and name
            this.eGui = document.createElement('span');
            this.eGui.setAttribute('class', 'imgSpanAvatar');

            // Use flexbox for layout
            this.eGui.style.display = 'flex';             
            this.eGui.style.alignItems = 'center';        
            this.eGui.style.height = '100%';              

            // Append the avatar and name to the container
            this.eGui.appendChild(avatar);
            this.eGui.appendChild(name);
        }

        // Required: Return the DOM element of the component, this is what the grid puts into the cell
        getGui() {
            return this.eGui;
        }

        // Required: Get the cell to refresh.
        refresh(params) {
            return false;
        }
    }


    let gridApi;

    const gridOptions = {
    // Data to be displayed
    rowData: [
        { Rank: 1, Name: "Arthur", Date: 64950, Time: "16h" },
        { Rank: 2, Name: "F-Series", Date: 33850, Time: "14h" },
        { Rank: 3, Name: "Corolla", Date: 29600, Time: "14h" },
        { Rank: 4, Name: "EQA", Date: 48890, Time: "16h" },
        { Rank: 5, Name: "500", Date: 15774, Time: "14h" },
        { Rank: 6, Name: "500", Date: 15774, Time: "14h" },
    ],
    // Columns to be displayed (Should match rowData properties)
    columnDefs: [
        { field: "Rank", flex: 0.5},
        { field: "Name", flex: 2, cellRenderer: NameRenderer},
        { field: "Date", flex: 1},
        { field: "Time", flex: 1},
    ],
    pagination: true,
    paginationPageSize: 20,
    };

    // Create Grid: Create new grid within the #myGrid div, using the Grid Options object
    gridApi = agGrid.createGrid(document.querySelector("#myGrid"), gridOptions);
});
</script>

