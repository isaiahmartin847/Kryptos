--@block
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE';

--@block
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'secret_tags';

--@block
SELECT * FROM secrets_v2


--@block
WITH secret_data AS (
    SELECT 
        -- Resource Metadata fields
        rm.id AS "metadataId",
        rm.key AS "metadataKey",
        rm.value AS "metadataValue",
        
        -- Secret fields (select all columns from secrets_v2)
        sv.*,
        
        -- Tag fields
        st.id AS "tagId",
        st.color AS "tagColor",
        st.slug AS "tagSlug",
        
        -- Rotation fields
        srsm."rotationId"
    FROM 
        "secrets_v2" sv
        LEFT JOIN "secret_v2_tag_junction" svjt ON sv.id = svjt."secrets_v2Id"
        LEFT JOIN "secret_tags" st ON svjt."secret_tagsId" = st.id
        LEFT JOIN "resource_metadata" rm ON sv.id = rm."secretId"
        LEFT JOIN "secret_rotation_v2_secret_mappings" srsm ON sv.id = srsm."secretId"
    WHERE 
        sv.id IN (
            '053d4bba-6f5a-4dfb-b1b4-5d18ad247525',
            'f99167ed-6736-4d08-b3d9-dd09c4ff706e',
            '1dd53026-60cf-4935-b971-8af5ab62118e'
        )
)
SELECT * FROM secret_data;