vA3C Viewer
===
vA3C is an open source, 3D model viewer for AEC models that uses THREE.js to render 3D geometry in the browser. vA3C allows authors in the AEC industry to easily publish their 3D design work on the web, for free.


There are two primary goals for vA3C.

Goal #1: provide the AEC industry with an easy, free, and open source means of publishing 3D content on the web. The vA3C platform allows users to export .json files from common AEC authoring applications - using open source plugins developed by the vA3C team - that can be opened with the vA3C viewer. The viewer comes in two flavors. One is a full page web application served from github.io that can open .json files from a user’s machine (or various other web storage providers). The second flavor is an embeddable viewer that can be included in any html page, and open a hosted .json file. Both viewers will provide a minimal user interface to allow for easy model navigation and intuitive element investigation.

Goal #2: build a general, extensible viewer app that can be forked to build more bespoke, use-case-specific applications. Besides it’s out of the box functionality as a model viewer, vA3C can be seen as a foundation project that is meant to be forked by power users to build other apps; the viewer can be easily customized, extended, hacked. vA3C should provide the lowest common denominator in terms of it’s UI and code base. It should have all of the features that all good AEC viewers should have, and ideally, nothing more. Which of course begs the question - what features should all AEC model viewers have? Opinions vary from camp to camp, and pinning down this specification is likely going to be one of the most challenging aspects of the project.


So why are we building this? What’s the point?

There is an incredible amount of knowledge built up in even the most typical [AEC] 3D models - geometrical and architectural relationships, BIM information, relationships between various building systems, etc. Compared to the abundance of this three-dimensionally-encoded knowledge that is being created continuously by the AEC industry, it remains relatively difficult for an author to share a thought in 3D with an audience of any size. It is easy to author 3D models, and difficult to publish them.

AEC wants to embrace 3D/4D in the browser, but everyone who wants to publish 3D content - designy architects, super fussy builders, stuffy old engineers, egomaniacal owners -- everyone - needs something a little different in terms of user interface, or they need a database on the back end, or whatever. As an industry, we need a free, open source solution that we can customize to suit all of our respective needs. vA3C aims to provide just that - a solid foundation that can be built upon by the other hackers in the industry - by developing an extensible, easy to use web viewer for AEC models.



