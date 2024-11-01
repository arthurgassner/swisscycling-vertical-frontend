# Swiss-northsouth Challenge

## Overview

TODO add image

## Podium

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/dist/styles/ag-theme-alpine.css">
<script src="https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js"></script>
<div id="myGrid" style="width: 100%; height: 350px;" class="ag-theme-alpine"></div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    class NameRenderer {
        eGui;

        init(params) {
            // Create the avatar image
            let avatar = document.createElement('img');
            avatar.src = `https://avatars.githubusercontent.com/u/38256417?v=4&size=64`;
            avatar.setAttribute('class', 'logo');
            avatar.style.height = '80%'; 
            avatar.style.width = 'auto'; // Maintain aspect ratio

            // Create a span for the name
            let name = document.createElement('span');
            name.textContent = params.value;
            name.style.marginLeft = '8px'; // Space between the image and the name
            name.style.alignSelf = 'center'; // Vertically-center

            // Create the container for the avatar and name
            this.eGui = document.createElement('span');
            this.eGui.setAttribute('class', 'imgSpanAvatar');

            // Use flexbox for layout
            this.eGui.style.display = 'flex';             
            this.eGui.style.alignItems = 'center';        
            this.eGui.style.height = '100%';              
            this.eGui.appendChild(avatar);
            this.eGui.appendChild(name);
        }

        // Required: Return the DOM element of the component
        // This is what the grid puts into the cell
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
    columnDefs: [
        { field: "Rank", flex: 0.5},
        { field: "Name", flex: 2, cellRenderer: NameRenderer},
        { field: "Date", flex: 1},
        { field: "Time", flex: 1},
    ],
    pagination: true,
    paginationPageSize: 20,
    };

    gridApi = agGrid.createGrid(document.querySelector("#myGrid"), gridOptions);
});
</script>

