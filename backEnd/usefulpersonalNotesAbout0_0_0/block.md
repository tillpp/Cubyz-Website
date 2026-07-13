{
    rotation:rotation = "cubyz:no_rotation"
    model: depending on rotation
    blockHealth:f32 = 1
    blockResistance:f32 = 0
    tags:Tag[] = non-strings as "incorrect", need at least one Tag
        if one of them is sbbChild => sbb.registerChildBlock
    emittedLight:u32 = 0
    absorbedLight:bool = 0xffffff
    degradable:bool = false
    selectable:bool = true
    replacable:bool = false
    gui: window = "" // gui to open when clicked 
    transparent:bool       = false
    collide:bool           = true
    alwaysViewThrough:bool = false
    viewThrough:bool = false ( if transparent or  alwaysViewThrough then this is automatically true)
    hasBackFace:bool = false
    friction : f32 = 20
    bounciness : f32 = 0.0
    density : f32 = 0.001
    terminalVelocity:f32 = 90
    mobility:f32   = 1.0
    allowOres::bool = false
    tickEvent:?TickEvent{
        name:?string orelse return null. name has to be a tickfuncion (there is only one "replaceWithCobble" replaced block with cobblestone)
        chance: f32 = 1
    }
    touchFunction:?TouchFunction = null (THERE ARE NO TOUCH FUNCTIONS, i.e. only valid value is null)
    blockEntity:?BlockEntityType = null 
    ore => if ore != .null then {
       assert(rotation must be cubyz:ore)
        veins     f32: 0
        size      f32: 0
        height    i32: 0
        minHeight i32: std.math.minInt(i32)
        density   f32: 0.5
    }
    lodReplacement: Block = this block
    opaqueVariant: Block = this block
    drops:{
        chance:f32 = 1
        items:string []
            defaults to "auto" 
            string trimps " ", then split by " ",
                last two elements: amount name
                 amount fallbacks to 1 if parse fails
                        A prefix of "0b" implies base=2,
                        A prefix of "0o" implies base=8,
                        A prefix of "0x" implies base=16,
                        Otherwise base=10 is assumed.
                itemname auto implies item to this block
    }[]
    hasItem:bool = true
    >item: parsed as item

}