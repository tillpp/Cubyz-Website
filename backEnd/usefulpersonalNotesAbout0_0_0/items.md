blocks has
    hasItem:bool = true
    >item: parsed as item

and there are:
items (standalone)

parsing items:
    texture:?string = null
        path items/textures/{s}
            invalid: default image (2x2 purple black)
    name:string = id
    tags:Tag[] = non-strings as "incorrect", need at least one Tag
    stacksize:u16 = 120
    material:
        if .object
            massDamage:f32     explicitly required
            hardnessDamage:f32 explicitly required
            durability:f32     explicitly required
            swingSpeed:f32     explicitly required
            textureRoughness:f32 = 1.0 (minimum is 0)
            colors:i32[] = []  // each entry defaults to 0xff000000
            modifiers:{
                id:modifier = "not specified"
                restriction:modifierRestriction = { 
                    id:modifierRestriction = "always"
                    ... depending on modifierRestriction
                } orelse "always"
                ... depending on modifier
            }[]
            
        else null
    block: ?block = null (get set later overriden with the same id )
    food:f32 = 0
    

    # generate tooltip: name\n (if material then printToolTip ) for(tags)(color 0x808080 " .tagname")\n
        printToolTip for material:
            color 0x808080 "Material"
            if( modifierRestriction != always)
                always => "always"
                and => "(" ... " and " .... ")"
                encased => "encased in {amount} .{tagName}"
                not => "not "...
                or => "(" ... " or " .... ")"