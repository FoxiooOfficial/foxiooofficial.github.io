const _Year_Copyright = "2025-2026";

function Fun_Loaded()
{
    /* css */
    Fun_Check_Style();

    /* updates */
    Fun_Post_And_Updates();


    /* Footer */
    var _Footer = document.getElementById("footer_copyright");
    _Footer.innerHTML = "<p>" + _Year_Copyright + " &copy; Foxioo<p>";
}

window.addEventListener('DOMContentLoaded', Fun_Loaded);