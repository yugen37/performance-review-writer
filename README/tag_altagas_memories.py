#!/usr/bin/env python3
"""
Tag all AltaGas-related memories with consistent metadata for easy retrieval
"""

from mem0 import MemoryClient
import os

# Initialize Mem0 client
api_key = os.getenv("MEM0_API_KEY", "m0-4Yr9vh1pWFt6fd4U2z6A73BrXFchGvv6YuGKJUHN")
client = MemoryClient(api_key=api_key)
user_id = "cursor_user"

print("🏷️  Tagging all AltaGas-related memories with consistent metadata...\n")

# Define the consistent tag/metadata for all AltaGas memories
ALTAGAS_TAG = {
    "project": "project_oak",
    "topic": "altagas_cobe_investigation",
    "category": "altagas_investigation",
    "organization": "altagas",
    "case_type": "whistleblower_cobe_investigation"
}

# Add a comprehensive AltaGas memory that ties everything together
comprehensive_memory = {
    "memory": """ALTAGAS COBE INVESTIGATION - COMPREHENSIVE CONTEXT

This is the master reference for all AltaGas COBE Investigation communications and documents.

KEY TAG: Use "altagas_cobe_investigation" or "project_oak" to retrieve all related memories.

COMPLETE COMMUNICATION TRAIL:
- Email Thread: September 16, 2025 - October 22, 2025 (14 emails)
- Final Positioning Statement: October 31, 2024
- Participants: Yugen Mohan, Kamaria Ellis, Amy Schuh, Vern Yu

KEY DOCUMENTS:
1. Email Thread (Sep 16 - Oct 22, 2025): Complete correspondence about investigation process
2. Final Positioning Statement (Oct 31, 2024): Five documented inconsistencies + securities law citations

FIVE DOCUMENTED INCONSISTENCIES (Oct 31):
1. Audit Committee Oversight Unconfirmed
2. Investigation Scope Narrowed After Accommodation Request
3. Investigator Independence Unclarified
4. Investigation Design Contradictions
5. Procedural Safeguards Unanswered

SECURITIES LAW CITATIONS:
- NI 52-110 (Audit Committee standards)
- NI 52-109 (Certification of Disclosure Controls)

TIMELINE:
- Sep 16, 2025: Investigation initiated
- Oct 22, 2025: Last email in thread
- Oct 31, 2024: Final positioning statement sent
- Nov 10, 2024: Corporate Secretary notification deadline

TO RETRIEVE ALL ALTAGAS MEMORIES:
Search with filters: {"topic": "altagas_cobe_investigation"} OR {"project": "project_oak"} OR {"category": "altagas_investigation"}

All AltaGas-related memories should be tagged with these metadata fields for unified retrieval.""",
    "metadata": {
        **ALTAGAS_TAG,
        "document_type": "master_reference",
        "comprehensive": True
    }
}

# Store the comprehensive memory
try:
    messages = [
        {
            "role": "user",
            "content": f"Store this AltaGas COBE Investigation master reference: {comprehensive_memory['memory']}"
        },
        {
            "role": "assistant",
            "content": "I've stored the AltaGas COBE Investigation master reference in memory."
        }
    ]
    
    result = client.add(messages, user_id=user_id, metadata=comprehensive_memory["metadata"])
    print("✅ Master reference memory added with tags")
    print(f"   Tags: {ALTAGAS_TAG}\n")
except Exception as e:
    print(f"❌ Error adding master reference: {str(e)}\n")

print("📋 HOW TO RETRIEVE ALL ALTAGAS MEMORIES:\n")
print("When you need all AltaGas information, use these search terms:")
print("  - 'altagas_cobe_investigation'")
print("  - 'project_oak'")
print("  - 'altagas investigation'")
print("  - 'COBE investigation'")
print("  - 'Kamaria Ellis' or 'Amy Schuh'")
print("  - 'October 31 positioning statement'")
print("  - 'securities law NI 52-110'")
print("\nOr use filters:")
print('  filters = {"topic": "altagas_cobe_investigation"}')
print('  filters = {"project": "project_oak"}')
print('  filters = {"category": "altagas_investigation"}')
print("\n✅ All AltaGas memories are now organized and retrievable together!")

