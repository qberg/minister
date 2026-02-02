## BUGS/LATER

- [ ] Unoptimized makes the ImagePreview component work with cloudfront

```
# Server action for map stats
User clicks zone → getMapStats("zone-1")
                    ↓
                    resolveZoneId → "zone-1" → ID: 42
                    ↓
                    fetchAggregatedStats(db, 42)
                    ↓
                    SQL query (WHERE zone_id = 42)
                    ↓
                    processQueryResults
                    ↓
                    Return stats
```
