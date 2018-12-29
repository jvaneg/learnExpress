//honestly i think this is totally unnecessary, dont need AJAX for this purpose, but its nice to learn
//jquery stuff, $(document).ready(function()) makes the function available once the document is loaded
$(document).ready(() => 
{
    //selects everything in the dom with the class .delete-todo and adds an onclick effect to them
    $('.delete-todo').on('click', (event) =>
    {
        $target = $(event.target); //here we use the $ as convention, common to prefix jquery objects with $ for clarity
        const id = $target.attr("data-id");
        
        //really dont need ajax for this purpose but w/e
        $.ajax(
            {
                type: "DELETE",
                url: "/todo/delete/" + id,
                success : (response) =>
                {
                    //alert("Deleting todo");
                    if(window.location.pathname.split('/').slice(-1)[0] === id)
                    {
                        window.location.href = "/";
                    }
                    else
                    {
                        window.location.href = window.location.pathname;
                    }
                },
                error: (error) =>
                {
                    console.log(error);
                }
            });
    });
});